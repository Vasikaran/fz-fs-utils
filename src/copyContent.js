import fs from 'fs';
import path from 'path';

function copyFile(srcPath, targetPath, isCopy = true){
    let readStream = fs.createReadStream(srcPath);
    let writeStream = fs.createWriteStream(targetPath);
    readStream.pipe(writeStream);
    readStream.on('end', ()=>{
        if (!isCopy){
            fs.unlinkSync(srcPath);
        }
    })
}

function iterateDirectory(srcPath, targetPath, isCopy){
    fs.readdirSync(srcPath).forEach((fileOrDir)=>{
        let fromPath = path.join(srcPath, fileOrDir);
        let toPath = path.join(targetPath, fileOrDir);
        if(fs.statSync(fromPath).isDirectory()){
            if (!fs.existsSync(toPath)){
                fs.mkdirSync(toPath);
            }
            iterateDirectory(fromPath, toPath, isCopy);
        }else{
            copyFile(fromPath, toPath, isCopy);
        }
    })
}

function copyContent(srcPath, targetPath, isCopy){
    if(fs.statSync(srcPath).isDirectory()){
        let { name } = path.parse(srcPath);
        let originPath = path.join(targetPath, name);
        if (!fs.existsSync(originPath)){
            fs.mkdirSync(originPath);
        }
        iterateDirectory(srcPath, originPath, isCopy);
    }else{
        copyFile(srcPath, targetPath, isCopy);
    }
}

export default copyContent;
