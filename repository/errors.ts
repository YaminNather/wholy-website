export class ModelDoesNotExistError extends Error {
    public constructor(modelName: string, id: string) {
        super(`Model of type ${modelName} with id ${id} does not exist`);
    }
}