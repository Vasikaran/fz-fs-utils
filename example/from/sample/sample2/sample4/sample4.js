import fs from 'fs';
import path from 'path';

function copyFile(srcPath, targetPath, isCopy){
    let readStream = fs.createReadStream(srcPath);
    let writeStream = fs.createWriteStream(targetPath);
    readStream.pipe(writeStream);

    readStream.on('end', ()=>{
        console.log('stream end');
        // if (!isCopy){
        //     fs.unlinkSync(srcPath);
        // }
    })
}

function iterateDirectory(srcPath, targetPath){
    fs.readdirSync(srcPath).forEach((fileOrDir)=>{
        let fromPath = path.join(srcPath, fileOrDir);
        let toPath = path.join(targetPath, fileOrDir);
        if(fs.statSync(fromPath).isDirectory()){
            if (!fs.existsSync(fromPath)){
                fs.mkdirSync(fromPath);
            }
            iterateDirectory(fromPath, toPath);
        }else{
            copyFile(fromPath, toPath);
        }
    })
}

function copy(srcPath, targetPath){
    if(fs.statSync(srcPath).isDirectory()){
        let { name } = path.parse(srcPath);
        let originPath = path.join(targetPath, name);
        if (!fs.existsSync(originPath)){
            fs.mkdirSync(originPath);
        }
        iterateDirectory(srcPath, originPath);
    }else{
        copyFile(srcPath, targetPath);
    }
}

export default copy;
