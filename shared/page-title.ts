export const SITE_NAME = "FreeDevTool.App";
export const HOMEPAGE_TITLE = `${SITE_NAME} | Free Developer Tools`;

export interface ToolForTitle {
  metadata: {
    title: string;
  };
}

export function getToolPageTitle(tool: ToolForTitle): string {
  return `${tool.metadata.title} | ${SITE_NAME}`;
}
