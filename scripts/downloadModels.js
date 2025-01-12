import fs from 'fs';
import https from 'https';
import path from 'path';

const baseUrl = 'https://github.com/justadudewhohacks/face-api.js/raw/master/weights/';
const modelsDir = path.join(process.cwd(), 'public', 'models');

const models = [
  'tiny_face_detector_model-weights_manifest.json',
  'tiny_face_detector_model-shard1',
  'face_landmark_68_model-weights_manifest.json',
  'face_landmark_68_model-shard1',
  'face_recognition_model-weights_manifest.json',
  'face_recognition_model-shard1',
  'face_recognition_model-shard2'
];

if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

models.forEach(model => {
  const file = fs.createWriteStream(path.join(modelsDir, model));
  https.get(`${baseUrl}${model}`, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded: ${model}`);
    });
  }).on('error', err => {
    fs.unlink(path.join(modelsDir, model));
    console.error(`Error downloading ${model}: ${err.message}`);
  });
});

