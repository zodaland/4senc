import { readFile, writeFile, existsSync, mkdirSync } from 'fs';
import YAML from 'yaml';
import path from 'path';

interface I4sInfo {
	[key: string]: any
	title: string|null,
	company: ICompany|null,
	footer: string|null,
	intro: string[]|null,
	menu: IMenu[]|null,
	password: string|null
}

interface IMenu {
	path: string,
	name: string,
	comments: string[]
}

interface ICompany {
	president: string,
	comment: [string]
}

const _4sPrototype: I4sInfo = {
	title: '',
	company: null,
	footer: '',
	intro: null,
	menu: null,
	password: ''
}

const yamlPath = path.join(global.config.path.data, '4s.yml');

const readYaml = (): Promise<I4sInfo> => {
	!existsSync(global.config.path.data) && mkdirSync(global.config.path.data);

	return new Promise((resolve, reject) => {
		readFile(yamlPath, 'utf-8', (err, _4sRawInfo) => {
			if (err) {
				global.log('yml', err, 'error');
				resolve({..._4sPrototype});
			} else {
				const _4sInfo: I4sInfo|null = YAML.parse(_4sRawInfo);
				if (!_4sInfo) {
					resolve({..._4sPrototype});
				} else {
					resolve(_4sInfo);
				}
			}
		});
	});
};

const writeYaml = (_4sInfo: I4sInfo): Promise<void> => {
	const keys = Object.keys(_4sInfo);
	const _4sInfoNew: object = keys.reduce((prev: any, cur: string) => {
		if (_4sInfo[cur]) {
			prev[cur] = _4sInfo[cur];
		}
		return prev;
	}, {});
	const _4sRawInfo = YAML.stringify(_4sInfoNew);
	return new Promise((resolve, reject) => {
		writeFile(yamlPath, _4sRawInfo, 'utf-8', (err) => {
			if (err) {
				global.log('yml', err, 'error');
				reject();
			}
			resolve();
		});
	});
};

export const readFooter = async (): Promise<string|null> => {
	const _4sInfo: I4sInfo|null = await readYaml();
	const footerInfo: string|null = _4sInfo.footer;

	return footerInfo;
};

export const writeFooter = async (footer: string): Promise<void> => {
	const _4sInfo: I4sInfo = await readYaml();
	_4sInfo.footer = footer;

	await writeYaml(_4sInfo);
	return;
};

export const readIntro = async (): Promise<string[]|null> => {
	const _4sInfo: I4sInfo = await readYaml();
	const introInfo: string[]|null = _4sInfo.intro;

	return introInfo;
};

export const writeIntro = async (introInfo: string[]) : Promise<void> => {
	const _4sInfo: I4sInfo = await readYaml();
	_4sInfo.intro = introInfo;

	await writeYaml(_4sInfo);
	return
};

export const readMenu = async (): Promise<IMenu[]|null> => {
	const _4sInfo: I4sInfo = await readYaml();
	const menuInfo: IMenu[]|null = _4sInfo.menu;

	return menuInfo;
};

export const writeMenu = async (menuInfo: IMenu[]): Promise<void> => {
	const _4sInfo: I4sInfo = await readYaml();
	_4sInfo.menu = menuInfo;

	writeYaml(_4sInfo);
	return;
}

export const readCompany = async (): Promise<ICompany|null> => {
	const _4sInfo: I4sInfo = await readYaml();
	const companyInfo: ICompany|null = _4sInfo.company;

	return companyInfo;
}

export const writeCompany = async (companyInfo: ICompany): Promise<void> => {
	const _4sInfo: I4sInfo = await readYaml();
	_4sInfo.company = companyInfo;
	
	writeYaml(_4sInfo);
	return;
}

export const readTitle = async (): Promise<string|null> => {
	const _4sInfo: I4sInfo = await readYaml();
	const title: string|null = _4sInfo.title;

	return title;
}

export const writeTitle = async (title: string): Promise<void> => {
	const _4sInfo: I4sInfo = await readYaml();
	_4sInfo.title = title;
	
	writeYaml(_4sInfo);
	return;
}

export const readPassword = async (): Promise<string|null> => {
	const _4sInfo: I4sInfo = await readYaml();
	const password: string|null = _4sInfo.password;

	return password;
}

export const writePassword = async(password: string): Promise<void> => {
	const _4sInfo: I4sInfo = await readYaml();
	_4sInfo.password = password;

	writeYaml(_4sInfo);
	return;
}