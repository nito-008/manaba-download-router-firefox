const BASE_DIR_NAME = "manaba-downloads";
let latestCourseName = "";

async function getCourseName(tabId: number): Promise<string> {
  const result = await browser.scripting.executeScript({
    target: { tabId },
    func: () => document.querySelector('#coursename')?.innerHTML,
  });
  return result[0]?.result ?? "";
}

async function onTabUpdate(tabId: number, changeInfo: Browser.tabs.OnUpdatedInfo, tab: Browser.tabs.Tab) {
  if (changeInfo.status !== "complete") return;

  const courseName = await getCourseName(tabId);
  if (!courseName) return;

  latestCourseName = courseName;
  console.log("Course name updated: ", courseName);
}

export default defineBackground(() => {
  browser.tabs.onUpdated.addListener(onTabUpdate);
  console.log('Hello background!', { id: browser.runtime.id });
});
