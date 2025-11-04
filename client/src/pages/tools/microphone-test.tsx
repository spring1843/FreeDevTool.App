import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mic, Play, Square, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { SecurityBanner } from "@/components/ui/security-banner";

export default function MicrophoneTest() {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | undefined>(
    undefined
  );
  const [error, setError] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isRecordingRef = useRef<boolean>(false);
  const { toast } = useToast();

  const requestPermission = async () => {
    try {
      setError("");

      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop immediately after getting permission

      setHasPermission(true);
      await getDevices();

      toast({
        title: "Permission Granted",
        description:
          "Microphone access has been granted. You can now record audio.",
      });
    } catch (err: unknown) {
      setHasPermission(false);
      let errorMessage = "Microphone permission denied.";
      const error = err as DOMException;

      if (error.name === "NotAllowedError") {
        errorMessage =
          "Microphone permission denied. Please allow microphone access to use this tool.";
      } else if (error.name === "NotFoundError") {
        errorMessage =
          "No microphone found. Please connect a microphone device.";
      } else {
        errorMessage = `Failed to access microphone: ${error instanceof Error ? error.message : "Unknown error"}`;
      }

      setError(errorMessage);
      toast({
        title: "Permission Denied",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const getDevices = async () => {
    try {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      const audioDevices = deviceList.filter(
        device => device.kind === "audioinput"
      );
      setDevices(audioDevices);
      // Always select the first device when devices are available
      if (audioDevices.length > 0) {
        const firstDevice = audioDevices[0];
        if (firstDevice.deviceId && firstDevice.deviceId !== "") {
          setSelectedDevice(firstDevice.deviceId);
        }
      }
    } catch (err: unknown) {
      setError(
        `Failed to enumerate devices: ${err instanceof Error ? err.message : "Please check microphone permissions"}`
      );
    }
  };

  // Get basic device info without permission on mount
  useEffect(() => {
    const getBasicDevices = async () => {
      try {
        const deviceList = await navigator.mediaDevices.enumerateDevices();
        const audioDevices = deviceList.filter(
          device => device.kind === "audioinput"
        );
        if (audioDevices.length > 0) {
          setDevices(audioDevices);
          // Always select the first device when devices are available
          const firstDevice = audioDevices[0];
          if (firstDevice.deviceId && firstDevice.deviceId !== "") {
            setSelectedDevice(firstDevice.deviceId);
          }
        }
      } catch (err: unknown) {
        setError(
          `Failed to enumerate devices: ${err instanceof Error ? err.message : "Please check microphone permissions"}`
        );
      }
    };

    getBasicDevices();
  }, []);

  // Draw waveform
  const drawWaveform = () => {
    if (!analyserRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    analyser.getByteTimeDomainData(dataArray);

    // Clear canvas
    canvasCtx.fillStyle = "rgb(15, 23, 42)"; // dark slate background
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw waveform
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(59, 130, 246)"; // blue
    canvasCtx.beginPath();

    const sliceWidth = (canvas.width * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * canvas.height) / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();

    // Continue animation if recording
    if (isRecordingRef.current) {
      animationFrameRef.current = requestAnimationFrame(drawWaveform);
    }
  };

  // Start recording
  const startRecording = async () => {
    try {
      setError("");
      const constraints: MediaStreamConstraints = {
        audio:
          selectedDevice && selectedDevice !== ""
            ? {
                deviceId: { exact: selectedDevice },
              }
            : true,
        video: false,
      };

      const mediaStream =
        await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = mediaStream;

      // Set up audio analyser for waveform
      const audioContext = new (window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(mediaStream);

      analyser.fftSize = 2048;
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      chunksRef.current = [];
      const mediaRecorder = new MediaRecorder(mediaStream, {
        mimeType: "audio/webm;codecs=opus",
      });

      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setRecordedBlob(blob);

        // Stop the stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }

        // Clean up audio context
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }

        // Stop animation
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      isRecordingRef.current = true;

      // Start waveform visualization
      drawWaveform();

      toast({
        title: "Recording Started",
        description: "Audio recording is now in progress.",
      });
    } catch (err: unknown) {
      let errorMessage = "Unknown error";
      const error = err as DOMException;

      if (error.name === "NotAllowedError") {
        errorMessage =
          "Permission denied. Please allow microphone access in your browser.";
      } else if (error.name === "NotFoundError") {
        errorMessage =
          "No microphone found. Please connect a microphone device.";
      } else if (error.name === "NotReadableError") {
        errorMessage = "Microphone is already in use by another application.";
      } else if (error.name === "OverconstrainedError") {
        errorMessage = "Selected microphone device is not available.";
      } else if (error.name === "SecurityError") {
        errorMessage =
          "Microphone access is blocked due to security restrictions.";
      } else {
        errorMessage =
          error instanceof Error ? error.message : "Failed to start recording";
      }

      setError(`Recording failed: ${errorMessage}`);
      toast({
        title: "Recording Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      isRecordingRef.current = false;
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      toast({
        title: "Recording Stopped",
        description: "Audio recording completed successfully.",
      });
    }
  };

  // Play recorded audio
  const playRecording = () => {
    if (!recordedBlob) return;

    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      return;
    }

    const url = URL.createObjectURL(recordedBlob);
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play();
      setIsPlaying(true);

      audioRef.current.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
      };
    }
  };

  // Download recorded audio
  const downloadRecording = () => {
    if (!recordedBlob) return;

    const url = URL.createObjectURL(recordedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `microphone-recording-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: "Your recording is being downloaded.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Microphone Test
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Record audio clips to test your microphone
            </p>
          </div>
          <SecurityBanner variant="compact" />
        </div>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mic className="w-5 h-5 mr-2" />
            Microphone Recording
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {devices.length > 0 && devices.some(device => device.label) && (
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                Select Microphone
              </label>
              <Select
                value={selectedDevice || ""}
                onValueChange={setSelectedDevice}
              >
                <SelectTrigger
                  className="flex-1"
                  data-testid="microphone-select"
                >
                  <SelectValue placeholder="Choose microphone..." />
                </SelectTrigger>
                <SelectContent>
                  {devices
                    .filter(
                      device => device.deviceId && device.deviceId.length > 0
                    )
                    .map(device => (
                      <SelectItem
                        key={device.deviceId}
                        value={
                          device.deviceId ||
                          `device-${Math.random().toString(36).substr(2, 9)}`
                        }
                      >
                        {device.label ||
                          `Microphone ${device.deviceId?.slice(0, 8) || "Unknown"}...`}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Waveform Visualization - Only show during recording */}
          <div
            className={`border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-950 ${isRecording ? "" : "hidden"}`}
          >
            <canvas
              ref={canvasRef}
              width={800}
              height={200}
              className="w-full h-[200px]"
              data-testid="waveform-canvas"
            />
          </div>

          <div className="space-y-2">
            {!hasPermission ? (
              <Button
                onClick={requestPermission}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                data-testid="request-microphone-permission"
              >
                <Mic className="w-4 h-4 mr-2" />
                Request Microphone Permission
              </Button>
            ) : !isRecording ? (
              <Button
                onClick={startRecording}
                className="w-full"
                data-testid="start-recording"
              >
                <Mic className="w-4 h-4 mr-2" />
                Start Recording
              </Button>
            ) : (
              <Button
                onClick={stopRecording}
                variant="destructive"
                className="w-full"
                data-testid="stop-recording"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop Recording
              </Button>
            )}
          </div>

          {recordedBlob ? <div className="space-y-2">
              <div className="flex gap-2">
                <Button
                  onClick={playRecording}
                  variant="outline"
                  className="flex-1"
                  data-testid="play-recording"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isPlaying ? "Stop Playback" : "Play Recording"}
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={downloadRecording}
                        variant="outline"
                        data-testid="download-recording"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Download recording</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <audio ref={audioRef} style={{ display: "none" }} />
            </div> : null}

          {error ? <Alert variant="destructive">
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert> : null}

          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <p>
              <strong>Status:</strong> {isRecording ? "Recording" : "Ready"}
            </p>
            <p>
              <strong>Devices:</strong> {devices.length} microphone(s) found
            </p>
            {recordedBlob ? <p>
                <strong>Recording:</strong>{" "}
                {(recordedBlob.size / 1024).toFixed(2)} KB
              </p> : null}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center my-8" />

      {/* Information */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm">
            <h4 className="font-semibold mb-2">Testing Your Microphone:</h4>
            <ul className="space-y-1 text-slate-600 dark:text-slate-400">
              <li>• Click "Request Microphone Permission" to allow access</li>
              <li>
                • Select your microphone from the dropdown (if multiple
                available)
              </li>
              <li>• Click "Start Recording" to begin recording</li>
              <li>• Watch the waveform visualizer respond to your voice</li>
              <li>• Speak into your microphone</li>
              <li>• Click "Stop Recording" when finished</li>
              <li>• Play back your recording to verify quality</li>
              <li>• Download the recording if needed</li>
            </ul>
          </div>
          <Alert>
            <AlertDescription className="text-sm">
              <strong>Privacy Note:</strong> This tool runs entirely in your
              browser. No audio data is sent to any server. Your browser will
              request microphone permission when you first start recording.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-8" />
    </div>
  );
}
