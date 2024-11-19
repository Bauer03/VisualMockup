import { DataManager } from "../util/dataManager";
import { OutputData } from "../types/types";

export const createNotebookContent = (): HTMLElement => { // note: this gets loaded immediately...
  const content = document.createElement("div");
  content.className = "flex flex-col px-3 gap-2 items-end";
  const textArea = document.createElement("textarea");
  let data = DataManager.loadOutputData() as OutputData;
  if (data) {
    textArea.value = `Sample Temperature: ${data.basic.temperature.sample}
Average Temperature: ${data.basic.temperature.average}
Sample Pressure: ${data.basic.pressure.sample}
Average Pressure: ${data.basic.pressure.average}
Sample Volume: ${data.basic.volume.sample}
Average Volume: ${data.basic.volume.average}
Total Energy: ${data.energy.total.sample}
Average Energy: ${data.energy.total.average}
Kinetic Energy: ${data.energy.kinetic.sample}
Average Kinetic Energy: ${data.energy.kinetic.average}
Potential Energy: ${data.energy.potential.sample}
Average Potential Energy: ${data.energy.potential.average}`;
  }
  textArea.id = "notebook-contents";
  textArea.className = `
    w-full p-2 rounded text-sm bg-white dark:bg-gray-800
    border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200`;
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
        <span>Clear Notebook</span>
        <span class="material-icons text-sm">delete</span>
  `;
  clearBtn.addEventListener("click", () => {
    textArea.value = "";
    DataManager.removeOutputData();
  });
  let buttoncontainer = document.createElement("div");
  buttoncontainer.className = "flex justify-end items-center gap-2";
  // buttoncontainer.appendChild(saveBtn);
  buttoncontainer.appendChild(clearBtn);
  content.appendChild(buttoncontainer);
  content.appendChild(textArea);

  window.addEventListener('copy-notebook', () => {
    let data = DataManager.loadOutputData() as OutputData;
    if (data) {
      textArea.value = 
      `Sample Temperature: ${data.basic.temperature.sample}
Average Temperature: ${data.basic.temperature.average}
Sample Pressure: ${data.basic.pressure.sample}
Average Pressure: ${data.basic.pressure.average}
Sample Volume: ${data.basic.volume.sample}
Average Volume: ${data.basic.volume.average}
Total Energy: ${data.energy.total.sample}
Average Energy: ${data.energy.total.average}
Kinetic Energy: ${data.energy.kinetic.sample}
Average Kinetic Energy: ${data.energy.kinetic.average}
Potential Energy: ${data.energy.potential.sample}
Average Potential Energy: ${data.energy.potential.average}`;
    }
  });

  return content;
};
