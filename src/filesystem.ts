import { promises as fs } from 'fs';

// Create or overwrite a file with the given content
export const createFile = async (path: string, content: string): Promise<void> => {
  try {
    await fs.writeFile(path, content);
  } catch (error) {
    throw new Error(`Failed to create file at ${path}: ${error}`);
  }
};

// Read the content of a file
export const readFile = async (path: string): Promise<string> => {
  try {
    const content = await fs.readFile(path, 'utf-8');
    return content;
  } catch (error) {
    throw new Error(`Failed to read file at ${path}: ${error}`);
  }
};

// Update the content of a file
export const updateFile = async (path: string, content: string): Promise<void> => {
  try {
    await fs.writeFile(path, content, { flag: 'a' }); // 'a' flag appends the content
  } catch (error) {
    throw new Error(`Failed to update file at ${path}: ${error}`);
  }
};

// Delete a file
export const deleteFile = async (path: string): Promise<void> => {
  try {
    await fs.unlink(path);
  } catch (error) {
    throw new Error(`Failed to delete file at ${path}: ${error}`);
  }
};

export const createFolder = async (path: string): Promise<void> => {
  try {
    await fs.mkdir(path, { recursive: true }); // recursive: true allows creating nested directories
  } catch (error) {
    throw new Error(`Failed to create folder at ${path}: ${error}`);
  }
};

// Delete a folder
export const deleteFolder = async (path: string): Promise<void> => {
  try {
    await fs.rmdir(path, { recursive: true }); // recursive: true allows removing non-empty directories
  } catch (error) {
    throw new Error(`Failed to delete folder at ${path}: ${error}`);
  }
};
