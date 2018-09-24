// setup file
import { configure } from 'enzyme';
 // https://github.com/airbnb/enzyme/issues/1284#issuecomment-352602304
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });