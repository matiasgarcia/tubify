import { shell } from 'electron';

export function openInFileExplorer(path){
  return shell.showItemInFolder(path);
}
