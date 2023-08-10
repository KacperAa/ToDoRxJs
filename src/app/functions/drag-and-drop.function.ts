export function dragAndDrop(elementId: string): void {
  const sortList = document.getElementById(elementId);

  let liCollection: any = sortList?.getElementsByTagName('li');
  let selectedLi: HTMLLIElement | null = null;

  for (let li of liCollection) {
    li.ondragstart = () => {
      selectedLi = li;

      for (let otherLi of liCollection) {
        if (otherLi != selectedLi) {
          otherLi.classList.add('hint');
        }
      }
    };

    li.ondragenter = () => {
      if (li !== selectedLi) {
        li.classList.add('active');
      }
    };

    li.ondragleave = () => li.classList.remove('active');

    li.ondragend = () => {
      for (let li of liCollection) {
        li.classList.remove('hint');
        li.classList.remove('active');
      }
    };

    li.ondragover = (selectedLi: DragEvent) => selectedLi.preventDefault();

    li.ondrop = () => {
      let actualPos = 0;
      let droppedPos = 0;

      for (let i = 0; i < liCollection.length; i++) {
        if (selectedLi === liCollection[i]) {
          actualPos = i;
        }
        if (li === liCollection[i]) {
          droppedPos = i;
        }
      }
      if (actualPos < droppedPos) {
        li.parentNode.insertBefore(selectedLi, li.nextSibling);
      } else {
        li.parentNode.insertBefore(selectedLi, li);
      }
    };
  }
}
