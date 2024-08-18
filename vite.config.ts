import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// `fileURLToPath`와 `URL`은 Node.js의 `url` 모듈에서 가져옵니다. 이들은 파일 경로를 URL 객체로 변환하거나 그 반대로 변환하는 데 사용됩니다.
// `defineConfig`는 Vite의 기본 구성 함수로, Vite 설정을 정의하는 데 사용됩니다.
// `vue`는 Vue.js 플러그인을 가져옵니다. 이 플러그인은 Vite와 Vue.js를 통합하게 해줍니다.

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    proxy: {
      "/api/v1": {
        target: "http://localhost:8080"
      }
    }
  }
})
/*
### `plugins` 섹션
- `plugins: [ vue() ]`: 이 설정은 Vite가 Vue.js 파일을 처리할 수 있도록 플러그인을 사용합니다. `.vue` 파일을 인식하고 처리할 수 있게 해줍니다.

### `server` 섹션
- `server: { port: 3000 }`: Vite 개발 서버가 기본적으로 사용할 포트를 3000번으로 지정합니다.

### `resolve` 섹션
- `resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } }`: 
  이 설정은 경로 별칭을 정의합니다. `'@'`는 `./src` 디렉토리를 가리키도록 설정되었습니다. 
  이를 통해 상대 경로 대신 `@/components/MyComponent.vue`와 같은 방식으로 경로를 간편하게 지정할 수 있습니다.

### 요약
- **플러그인 사용**: Vue.js 플러그인을 사용하여 Vue.js 파일을 처리합니다.
- **서버 설정**: 개발 서버가 3000번 포트에서 실행되도록 설정합니다.
- **경로 별칭**: `'@'`를 프로젝트의 `src` 디렉토리로 매핑하여 경로 설정을 간편하게 합니다.

*/
