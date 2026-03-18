export const assertUnreachable = (arg: never): never => {
	throw new Error(`Unreachable case: ${arg}`);
};
