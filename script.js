

let selectedElement = null;

document.querySelectorAll('.element').forEach(el => {
  el.addEventListener('dragstart', e => {
    e.dataTransfer.setData('type', e.target.dataset.type);
  });
});

const canvas = document.getElementById('canvas');

canvas.addEventListener('dragover', e => {
  e.preventDefault();
});

canvas.addEventListener('drop', e => {
  e.preventDefault();
  const type = e.dataTransfer.getData('type');
  let newEl;

  if (type === 'text') {
    newEl = document.createElement('p');
    newEl.textContent = 'Editable Text';
  } else if (type === 'image') {
    newEl = document.createElement('div');
    const img = document.createElement('img');
    img.src = 'https://via.placeholder.com/150';
    img.style.maxWidth = '100%';
    newEl.appendChild(img);
  } else if (type === 'button') {
    newEl = document.createElement('button');
    newEl.textContent = 'Click Me';
    newEl.style.backgroundColor = '#007BFF'; 
    newEl.style.color = '#000000'; 
  }

  if (newEl) {
    newEl.addEventListener('click', () => selectElement(newEl, type));
    canvas.appendChild(newEl);
  }
});

function selectElement(el, type) {
  selectedElement = el;
  const form = document.getElementById('propertiesForm');

  if (type === 'image') {
    const img = el.querySelector('img');
    form.text.value = '';
    form.fontSize.value = '';
    form.color.value = '#000000';
    form.src.value = img ? img.src : '';
  } else if (type === 'button') {
    form.text.value = el.textContent || '';
    form.fontSize.value = parseInt(window.getComputedStyle(el).fontSize) || '';
    const bgColor = window.getComputedStyle(el).backgroundColor;
    form.color.value = rgbToHex(bgColor);
    form.src.value = '';
  } else {
    form.text.value = el.textContent || '';
    form.fontSize.value = parseInt(window.getComputedStyle(el).fontSize) || '';
    form.color.value = rgbToHex(window.getComputedStyle(el).color);
    form.src.value = '';
  }
}

function applyProperties() {
  const form = document.getElementById('propertiesForm');
  if (!selectedElement) return;

  const type = selectedElement.tagName.toLowerCase();

  if (type === 'p') {
    if (form.text.value.trim() !== '') {
      selectedElement.textContent = form.text.value.trim();
    }
    if (form.fontSize.value.trim() !== '') {
      selectedElement.style.fontSize = form.fontSize.value + 'px';
    }
    if (form.color.value.trim() !== '') {
      selectedElement.style.color = form.color.value;
    }
  } else if (type === 'button') {
    if (form.text.value.trim() !== '') {
      selectedElement.textContent = form.text.value.trim();
    }
    if (form.fontSize.value.trim() !== '') {
      selectedElement.style.fontSize = form.fontSize.value + 'px';
    }
    if (form.color.value.trim() !== '') {
     
      selectedElement.style.backgroundColor = form.color.value;

      
      if (form.color.value.toLowerCase() === '#000000') {
        selectedElement.style.color = '#ffffff';
      } else {
        selectedElement.style.color = '#000000';
      }
    }
  } else if (type === 'div') {
    const img = selectedElement.querySelector('img');
    if (img && form.src.value.trim() !== '') {
      img.src = form.src.value.trim();
    }
  }
}

function rgbToHex(rgb) {
  const result = rgb.match(/\d+/g);
  return result
    ? '#' +
        result
          .slice(0, 3)
          .map(x => ('0' + parseInt(x).toString(16)).slice(-2))
          .join('')
    : '#000000';
}
