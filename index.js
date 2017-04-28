browser.contextMenus.create({
  id: "open-bug",
  title: "Open bugzilla bug",
  contexts: ["selection"],
});

function openBug(info, tab) {
  const id = /(\d+)/.exec(info.selectionText)[1];
  if (id.length > 0) {
    browser.tabs.create({
      active: true,
      url: `http://bugzil.la/${id}`,
    });
  }
}

browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "open-bug":
      openBug(info, tab);
      break;
  }
});

function toggleSidebar() {
  browser.sidebarAction.getPanel({})
    .then(() => {
      browser.sidebarAction.setPanel({
        panel: 'https://fitzgen.github.io/bugzilla-todos/',
      });
    });
}
