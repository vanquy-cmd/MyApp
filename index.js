import { AppRegistry } from 'react-native';
import App from './App'; // Đảm bảo đường dẫn này là chính xác
import { name as appName } from './app.json';

// Đăng ký component chính của ứng dụng
AppRegistry.registerComponent(appName, () => App);