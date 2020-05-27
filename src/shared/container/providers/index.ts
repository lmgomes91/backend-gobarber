import { container } from 'tsyringe';

import IStorageProvider from './storageProvider/models/IStorageProvider';
import DiskStorageProvider from './storageProvider/implementations/DiskStorageProvider';

import ImailProvider from './MailProvider/Models/iMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtheralMailProvider';

import ImailTemplateProvider from './MailTemplateProvider/models/IMailTemplatePRovider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<ImailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<ImailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
