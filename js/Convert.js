function addFiles(newFiles){
const arr = Array.from(newFiles);
// filter supported types (image, audio, video)
const supported = arr.filter(f => /image|audio|video/.test(f.type));
const unsupported = arr.filter(f => !/image|audio|video/.test(f.type));
files = files.concat(supported);
if(unsupported.length) alert(`${unsupported.length} file(s) were ignored (unsupported type).`);
renderFileList();
}


// Drag & Drop
['dragenter','dragover'].forEach(ev => {
dropzone.addEventListener(ev, e => { e.preventDefault(); dropzone.classList.add('dragover'); });
});
['dragleave','drop'].forEach(ev => {
dropzone.addEventListener(ev, e => { e.preventDefault(); dropzone.classList.remove('dragover'); });
});


dropzone.addEventListener('drop', e => {
if(e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files);
});


// Browse button
browseBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', e => addFiles(e.target.files));


// Convert flow
convertBtn.addEventListener('click', async () => {
if(files.length === 0) return;
// read selected output format
const format = document.querySelector('input[name="format"]:checked').value; // 'xml' or 'json'


// prepare UI
progressArea.classList.remove('hidden');
progressList.innerHTML = '';
completedArea.classList.add('hidden');
resultsList.innerHTML = '';
convertBtn.disabled = true;


// simulate conversion one-by-one
const convertedFiles = [];
for(let i=0;i<files.length;i++){
const file = files[i];
const progEl = document.createElement('div');
progEl.className = 'progress-item';
progEl.innerHTML = `
<div class="progress-row">
<div><strong>${file.name}</strong></div>
<div class="progress-label">0%</div>
</div>
<div class="progress-bar"><div class="progress-fill"></div></div>
`;
progressList.appendChild(progEl);
}

const fill = progEl.querySelector('.progress-fill');
const label = progEl.querySelector('.progress-label');


// simulate progress with random duration based on size
const sizeFactor = Math.min(Math.max(file.size / (1024*1024), 0.5), 10); // between 0.5 and 10
const duration = 2000 + (sizeFactor * 500); // ms
const steps = 40;
const stepTime = duration / steps;
for(let step=1; step<=steps; step++){
await new Promise(res => setTimeout(res, stepTime));
const pct = Math.min(100, Math.round((step/steps)*100));
fill.style.width = pct
}
})

