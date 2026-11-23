import { setDefaultTimeout } from '@cucumber/cucumber';
import { envConfig } from '../config/load-env';

setDefaultTimeout(envConfig.cucumberTimeout);
