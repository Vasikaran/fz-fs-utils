import copyContent from './copyContent';

function copy(srcPath, targetPath){
    let isCopy = true;
    copyContent(srcPath, targetPath, isCopy);
}

export default copy;
