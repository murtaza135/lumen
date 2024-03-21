export function download(file) {
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.style.display = 'hidden';
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadSrc(src, name) {
  const a = document.createElement('a');
  a.style.display = 'hidden';
  a.href = src;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
