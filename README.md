## 🫖 Next.js Boilerplate

sookyeongyeom의 보일러플레이트입니다 :D

## Index

1. [시작하기](#1-시작하기)
2. [기술 스택](#2-기술-스택)
3. [디렉토리 구조 가이드](#3-디렉토리-구조-가이드)
4. [코드 컨벤션](#4-코드-컨벤션)
5. [API 관련 컨벤션](#5-API-관련-컨벤션)
6. [커밋 컨벤션](#6-커밋-컨벤션)

## 1. 시작하기

### 1. Clone

```shell
$ git clone https://github.com/sookyeongyeom/next-boilerplate
$ cd next-boilerplate
$ yarn install
```

### 2. Run

```javascript
$ yarn dev
```

## 2. 기술 스택

<a><img src="https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js&logoColor=white"/></a>
<a><img src="https://img.shields.io/badge/TS-3178C6?style=flat-square&logo=typescript&logoColor=white"/></a>
<br/>
<a><img src="https://img.shields.io/badge/Jotai-black?style=flat-square&logo=ghostery&logoColor=white"/></a>
<a><img src="https://img.shields.io/badge/Jotai DevTools-black?style=flat-square&logo=ghostery&logoColor=white"/></a>
<a><img src="https://img.shields.io/badge/React Query-FF4154?style=flat-square&logo=reactquery&logoColor=white"/></a>
<br/>
<a><img src="https://img.shields.io/badge/Emotion-D26AC2?style=flat-square&logo=southwestairlines&logoColor=white"/></a>
<a><img src="https://img.shields.io/badge/Immer-00E7C3?style=flat-square&logo=immer&logoColor=white"/></a>
<a><img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white"/></a>
<br/>
<a><img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=white"/></a>
<a><img src="https://img.shields.io/badge/EsLint-4B32C3?style=flat-square&logo=eslint&logoColor=white"/></a>
<br/>
<a><img src="https://img.shields.io/badge/Yarn-2C8EBB?style=flat-square&logo=yarn&logoColor=white"/></a>

## 3. 디렉토리 구조 가이드

```
├── @types
│   ├── api
│   │   └── auth.d.ts
│   ├── axios
│   │   └── core.d.ts
│   └── client
│       ├── base.d.ts
│       ├── custom.d.ts
│       ├── index.d.ts
│       └── seo.d.ts
├── api
│   ├── core
│   │   └── index.ts
│   ├── auth.ts
│   └── index.ts
├── atoms
│   ├── authAtom.ts
│   └── index.ts
├── components
│   ├── index.ts
│   ├── hocs
│   ├── layouts
│   ├── pages
│   └── seo
├── constants
│   ├── index.ts
│   ├── keys.ts
│   └── paths.ts
├── hooks
│   ├── useChange.ts
│   ├── useCustomRouter.ts
│   ├── useInput.ts
│   ├── useMobile.ts
│   ├── usePreventScroll.ts
│   ├── useQueryString.ts
│   ├── useRouteToPath.ts
│   ├── useSwitch.ts
│   └── useUniqueId.ts
├── styles
│   ├── alphaToHex.ts
│   ├── colors.ts
│   ├── devices.ts
│   ├── fonts.ts
│   ├── global.ts
│   ├── index.ts
│   ├── reset.ts
│   ├── sizes.ts
│   └── svgs.tsx
├── pages
│   ├── _app.tsx
│   └── home
│       └── index.tsx
├── utils
├── public
├── README.md
├── tsconfig.json
├── next.config.js
├── next-env.d.ts
├── package.json
└── yarn.lock
```

### 1. @types/

1. 모든 type 선언은 이곳에서 한다.
2. 파일 이름은 \*.d.ts 형식을 지킨다.
3. 외부 모듈의 타입에 의존하는 타입은 @types/index.d.ts 파일에 선언한다.

### 2. api/

1. api/index.ts - Axios 인스턴스 및 인터셉터 정의
2. api/... - 각 엔드포인트의 baseUrl명을 파일 이름으로 하여 추가

### 3. atoms/

1. atoms/index.ts - Default Store를 선언하여 Export
2. atoms/... - 각 atom명을 파일 이름으로 하여 추가

### 4. components/

1. components/layouts - 레이아웃 컴포넌트
2. components/hocs - RouterGuard 등 HOC 컴포넌트
3. components/pages - 각 page의 최상위 컴포넌트 및 해당 page에서 사용되는 하위 컴포넌트
4. components/seo - CustomHead 등 SEO에 사용되는 컴포넌트
5. components/... - 필요에 따라 추가

### 5. constants/

1. constants/keys.ts - 각종 Key
2. constants/paths.ts - Paths
3. constants/... - 필요에 따라 추가

### 6. hooks/

자주 사용하는 Custom Hooks

1. hooks/useChange.ts
2. hooks/useCustomRouter.ts
3. hooks/useInput.ts
4. hooks/useMobile.ts
5. hooks/usePreventScroll.ts
6. hooks/useQueryString.ts
7. hooks/useRouteToPath.ts
8. hooks/useSwitch.ts
9. hooks/useUniqueId.ts

### 7. styles/

1. styles/alphaToHex.ts - 0~1을 Hex로 변환한 값들의 모음
2. styles/colors.ts
3. styles/devices.ts - 뷰포트에 따른 디바이스 구분 기준
4. styles/fonts.ts - 기본 아토믹 타이포그래피
5. styles/global.ts - 기본 전역 스타일
6. styles/reset.ts - 기본 리셋 스타일
7. styles/sizes.ts
8. styles/svgs.tsx

### 8. pages/

라우터 설정을 위한 Next.js 예약 디렉토리

### 9. utils/

자주 사용하는 Utils

1. utils/fetchAndSet.ts
2. utils/setLayout.ts
3. utils/withoutPropagation.ts

### 10. Named Export & Re-Export in Index.ts

```javascript
// components/shared/index.ts
export * from './ContactWidget';
export * from './Navigator';
export * from './SpaceBackground';
```

```javascript
// components/index.ts
export * from './shared';
```

```javascript
// components/layouts/WithNavigatorLayout.tsx
import { Navigator, ContactWidget } from '@components';
```

## 4. 코드 컨벤션

### 1. EsLint Rules

1. Import문 순서 자동 배치
2. Named Export 강제 (pages/\*\*/\* 제외)
3. React Component props에 중괄호가 필요없는 경우 자동 삭제
4. Prettier 연동
5. 외 Recommended Rules

### 2. Type Naming

1. Props Type 선언 시 Type을 사용한다. (Interface X)
2. Props Type의 이름은 **[컴포넌트이름]+Props** 의 형식으로 짓는다.

```typescript
type HeaderProps = {
  onOpenDrawer: (e: React.MouseEvent) => void;
};

type PublicationBoxElementProps = {
  title: string;
  writer: string;
  img: string;
  pdf: string;
};
```

3. Interface 선언 시, 클래스의 인터페이스로 사용할 목적이 아니라면 **접두사 I를 사용하지 않는다**.

### 3. Constants

객체로 정의하되, `as const` 키워드를 사용하여 read-only 객체로 만든다.

```typescript
export const Paths = {
  new: '/new',
  newComplete: '/new/complete',
  main: '/main',
  reply: '/reply',
  replyComplete: '/reply/complete',
  view: '/view',
} as const;
```

### 4. px - rem 관련

1rem = 10px (styles/global.ts)  
사용자 폰트 크기 대응을 위해 가급적 px이 아닌 rem을 사용한다.

## 5. API 관련 컨벤션

### 1. Generic Instance

Axios Instance의 Request Methods 시그니쳐 오버라이딩

```typescript
// @types/axios/core.d.ts
import { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface GenericInstance extends AxiosInstance {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T, U = void>(url: string, data?: U, config?: AxiosRequestConfig): Promise<T>;
  put<T, U>(url: string, data: U, config?: AxiosRequestConfig): Promise<T>;
  patch<T, U>(url: string, data: U, config?: AxiosRequestConfig): Promise<T>;
}
```

### 2. API Schema

Request & Response Schema 정의

1. 요청 스키마 네임스페이스 네이밍 - **Request+[baseUrl]**
2. 응답 스키마 네임스페이스 네이밍 - **Response+[baseUrl]**
3. 스키마 타입 네이밍 - **[Method]**

```typescript
// @types/api/club.d.ts
declare namespace RequestClub {
  type Post = {
    name: string;
    profileImgUrl: string;
    startDate: string;
    endDate: string;
  };
}

declare namespace ResponseClub {
  type Get = {
    id: 1;
    name: string;
    profileImgUrl: string;
    clubCode: string;
    startDate: string;
    endDate: string;
    numOfMember: number;
  };

  type Post = {
    id: number;
    code: string;
  };
}
```

### 3. Axios Promise Generator

API 호출용 함수 정의

1. 쿼리는 데이터와 별개의 파라미터로 넘김
2. 정의해둔 스키마 타입을 각 구간에 지정
   1. 휴먼 에러 방지
   2. 반환될 데이터 타입 지정
3. Axios Promise를 반환

```typescript
// api/club.ts
import request from './core';

const baseUrl = '/club';

export const getClub = (clubId: number) => {
  const url = `${baseUrl}/${clubId}`;
  return request.get<ResponseClub.Get>(url);
};

export const postClub = (data: RequestClub.Post) => {
  const url = `${baseUrl}`;
  return request.post<ResponseClub.Post, RequestClub.Post>(url, data);
};
```

### 4. Call Generator to Request

```typescript
// Somewhere in components
import { postClub } from '@api';

const onSubmit = async () => {
  await postClub({
    name: clubName,
    profileImgUrl: fileKey,
    startDate: '2023. 3. ' + startDate,
    endDate: '2023. 3. ' + endDate,
  });
  onRouteToMain();
};
```

### 5. Error Handling

에러가 발생하면 Interceptor에서 Promise Chain을 끊는다.

1. 예외처리
2. async 스코프의 흐름이 다음으로 진행하지 못하게 한다.

```typescript
// api/core/index.ts
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);
    return new Promise(() => {});
  },
);
```

### 6. Interceptors

1. 요청 직전, auth 관련 전역 상태를 확인하여 인증 헤더를 설정한다.
2. 백엔드가 Snake Case를 사용하는 경우, 요청쪽에 camelToSnake, 응답쪽에 snakeToCamel 컨버터를 붙인다.

## 6. 커밋 컨벤션

### 1. 브랜치 이름 컨벤션

```
Feature/[기능요약]

- 맨 첫글자 F만 대문자로, 기능요약은 소문자로 작성한다.
- 띄어쓰기는 하이픈으로 구분한다.

ex) Feature/modal-publishing
```

### 2. 커밋 메세지 컨벤션

```
<태그>: <제목>

- 태그의 첫글자는 대문자로 작성한다.
- 태그는 아래에 적힌 것들만 사용한다.

Feat: 새로운 기능 추가, 기능 로직 변경
Fix: 버그 수정
Refactor: 코드 리팩토링 (기능 변화 X)
Style: 코드 포맷팅, 코드 변경이 없는 경우
Chore: 빌드 업무 수정, 패키지 매니저 수정
Docs: 문서 수정, 주석
```
