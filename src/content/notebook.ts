import { DataManager } from "../util/dataManager";
import { OutputData } from "../types/types";

export const createNotebookContent = (): HTMLElement => { // note: this gets loaded immediately...
  const content = document.createElement("div");
  content.className = "flex flex-col px-3 gap-2 items-end";
  let data = DataManager.loadOutputData() as OutputData;
  if (data) {
    // initialize variables containing data
  }
  let clearBtn = document.createElement("button");
  clearBtn.className = 
    `px-2 py-1 text-xs shadow-sm rounded font-light
    hover:bg-white dark:hover:bg-gray-800
    bg-gray-100 dark:bg-gray-700
    text-gray-800 dark:text-gray-200
    border border-white dark:border-gray-600
    transition-colors duration-200 items-center
    flex gap-1`;
  clearBtn.innerHTML = `
        <span>Clear</span>
        <span class="material-icons text-sm">delete</span>
  `;
  clearBtn.addEventListener("click", () => {
    if(confirm("are you sure you want to clear all items in the notebook?"))
      DataManager.removeOutputData();
  });

  content.appendChild(clearBtn);

  return content;
};
