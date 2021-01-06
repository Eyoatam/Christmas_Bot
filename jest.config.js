module.exports = {
	globals: {
		"ts-jest": {
			tsconfig: "tsconfig.json",
		},
	},
	moduleFileExtensions: ["ts", "js"],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
	testMatch: ["<rootDir>/__tests__/*.spec.[jt]s?(x)"],
	testEnvironment: "node",
};
