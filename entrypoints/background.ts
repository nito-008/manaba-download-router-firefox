const BASE_DIR_NAME = "manaba-downloads";
let latestCourseName = "";

function isManaba(url: string): boolean {
  return new URL(url).hostname.includes("manaba");
}

async function getCourseName(tabId: number): Promise<string> {
  const result = await browser.scripting.executeScript({
    target: { tabId },
    func: () => document.querySelector("#coursename")?.textContent,
  });
  return result[0]?.result ?? "";
}

async function onTabUpdate(
  tabId: number,
  changeInfo: Browser.tabs.OnUpdatedInfo,
  tab: Browser.tabs.Tab,
) {
  if (tab.url && !isManaba(tab.url)) return;
  if (changeInfo.status !== "complete") return;

  const courseName = await getCourseName(tabId);
  if (!courseName) return;

  latestCourseName = courseName;
  console.log("Course name updated: ", courseName);
}

function getBaseName(filePath: string): string {
  return filePath.split(/[\\/]/).pop() ?? "";
}

function getDownloadPath(fileName: string): string {
  return [BASE_DIR_NAME, latestCourseName, getBaseName(fileName)].join("/");
}

function onDownloadCreated(downloadItem: Browser.downloads.DownloadItem) {
  if (downloadItem.byExtensionId) return;
  if (!isManaba(downloadItem.url)) return;

  browser.downloads
    .cancel(downloadItem.id)
    .then(() => {
      return browser.downloads.erase({ id: downloadItem.id });
    })
    .then(() => {
      const filePath = getDownloadPath(downloadItem.filename);
      console.log("Download file: ", filePath);

      return browser.downloads.download({
        url: downloadItem.url,
        filename: filePath,
        saveAs: false,
      });
    })
    .catch((error) => {
      console.error("Failed to download file: ", error);
    });
}

export default defineBackground(() => {
  browser.tabs.onUpdated.addListener(onTabUpdate);
  browser.downloads.onCreated.addListener(onDownloadCreated);
  console.log("Hello background!", { id: browser.runtime.id });
});
