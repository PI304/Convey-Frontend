# 🖋️ Convey

이 문서에는 Convey FE에 대한 개괄적인 정보가 담겨있습니다.  
비즈니스 로직, 코드 컨벤션, CI/CD 등 보다 상세한 내용은 아래 링크된 위키에서 확인해주세요.

📖 [Convey 위키 바로가기](https://github.com/PI304/Convey-Frontend/wiki/소개)

## Index

1. [프로젝트 개요](#1-프로젝트-개요)
2. [핵심 기능](#2-핵심-기능)
3. [문서](#3-문서)
4. [시작하기](#4-시작하기)
5. [기술 스택](#5-기술-스택)
6. [디렉토리 구조](#6-디렉토리-구조)
7. [커밋 컨벤션](#7-커밋-컨벤션)

## 1. 프로젝트 개요

Convey는 설문 제작 및 응답 수집을 위한 어플리케이션입니다.

제공되는 6개의 척도를 사용하여 연구자가 원하는대로 설문지를 커스텀 제작할 수 있으며,  
여러개의 설문을 묶어 하나의 설문 패키지로 만들 수 있습니다.

이렇게 만든 설문 패키지는 워크스페이스에 등록할 수 있으며,  
각 워크스페이스에 루틴을 생성하여 연구자가 원하는 일시에 앱을 통해 피험자에게 푸시 알림을 전송할 수 있습니다.

Convey의 클라이언트는 웹와 앱, 둘로 나뉩니다.

- 웹은 설문 제작, 패키지 제작, 워크스페이스 관리, 루틴 관리, 응답 확인 등을 수행할 수 있는 어드민 툴입니다.
- 앱은 푸시 알림 및 응답 제출을 수행할 수 있는 피험자 툴입니다.

이곳은 웹 FE를 위한 저장소이며, 이하의 Convey는 웹 FE를 지칭합니다.

## 2. 핵심 기능

Convey MVP의 목표는 전체 플로우에 대한 핵심 기능 구현입니다.

### 전체 플로우

1. 커스텀 설문 관리 (surveys)
2. 다수의 설문을 묶는 패키지 관리 (packages)
3. 다수의 패키지를 묶고, 루틴을 설정하기 위한 워크스페이스 관리 (workspaces)

### 커스텀 설문 관련

![surveys-preview](https://user-images.githubusercontent.com/98504939/227277111-edf5c391-d0b0-464f-9061-df2e3bd975b1.gif)

커스텀 설문은 다음 6개의 척도를 제공합니다.

1. 리커트 (likert)
2. 정도 (extent)
3. 단일선택 (single select)
4. 복수선택 (multiple select)
5. 단답형 (short answer)
6. 장문형 (long answer)

설문은 척도를 기준으로 구분되며, 구분된 각 영역을 섹터라고 지칭합니다.

### 패키지 관련

![packages-preview](https://user-images.githubusercontent.com/98504939/227277415-39640635-36e1-4082-8848-dd82c591122e.gif)

1. 하나의 패키지는 다수의 디바이더를 포함합니다. (package ↢ parts)
2. 하나의 디바이더는 다수의 대주제를 포함합니다. (part ↢ subjects)
3. 하나의 대주제는 다수의 소주제(커스텀 설문)를 포함합니다. (subject ↢ surveys)

### 워크스페이스 관련

![workspace-preview](https://user-images.githubusercontent.com/98504939/227277567-08fcc5da-d404-4e57-8b44-ce551706b524.gif)

1. 하나의 워크스페이스는 다수의 패키지를 포함합니다. (workspace ↢ packages)
2. 워크스페이스에 포함된 패키지를 사용하여 루틴을 생성할 수 있습니다.

### 루틴 관련

루틴 첫 생성 시, duration과 kick-off survey를 지정해야 합니다.

1. duration : 루틴이 진행될 전체 일수
   - 4/1~4/3 동안 루틴이 진행된다면, duration은 3입니다.
2. kick-off survey : 루틴 시작의 기준이 되는 설문입니다.

세부 루틴 추가 시, nthDay, time 및 package를 지정해야 합니다.

1. nthDay : 루틴 시작일로부터 n번째 날 알림을 보냅니다.
2. time : HH:MM 형식으로 알림을 보낼 시간을 입력합니다.
3. package : 응답을 요구할 설문 패키지

## 3. 문서

초반 아이디에이션 문서입니다.  
용어 및 기술 기획 과정이 담겨있습니다.  
(용어는 실제 개발 과정에서 다소 변동된 부분이 있습니다.)

- [용어 정리 및 목표 설정](https://github.com/PI304/CONVEY_DEV/blob/main/%5B23.02.16%5D%20%EA%B0%9C%EB%B0%9C%EC%A7%84%201%EC%B0%A8%20%EB%AF%B8%ED%8C%85.md)
- [핵심 로직 아이디에이션](https://github.com/PI304/CONVEY_DEV/blob/main/%5B23.03.02%5D%20MVP%20%ED%95%B5%EC%8B%AC%20%EB%A1%9C%EC%A7%81%20-%20%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8.md)

API 문서는 스웨거를 사용합니다.

- [Convey Swagger](http://3.34.67.68/api/swagger/)

## 4. 시작하기

### 1. Clone & Install

```shell
$ git clone https://github.com/PI304/Convey-Frontend
$ cd Convey-Frontend
$ yarn install
```

### 2. Run

```javascript
$ yarn dev
```

## 5. 기술 스택

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

## 6. 디렉토리 구조

```
├── .github/workflows
│   └── dev.yml       // Dev 서버 배포자동화를 위한 yml
├── pages
├── public
├── src
│   ├── @types
│   │   ├── api       // API 요청, 응답 스키마 타입
│   │   ├── client    // API 제외 모든 타입
│   │   └── dep       // 외부 모듈 타입 오버라이딩
│   ├── api
│   │   ├── core      // Axios 인스턴스
│   │   ├── hooks     // React Query Hooks
│   │   └── promises  // API 요청 Promises
│   ├── atoms         // Jotai Atoms
│   ├── components
│   ├── constants
│   ├── hooks         // Custom Hooks
│   ├── models        // 데이터 모델
│   ├── styles
│   └── utils         // 유틸 함수
├── next-env.d.ts
├── next.config.js
├── package.json
├── tsconfig.json
├── yarn-error.log
├── yarn.lock
├── Dockerfile        // 배포자동화를 위한 도커파일
└── README.md
```

## 7. 커밋 컨벤션

### 1. 브랜치 이름 컨벤션

```
Feature/[기능요약]

- 맨 첫글자 F만 대문자로, 기능요약은 소문자로 작성합니다.
- 띄어쓰기는 하이픈으로 구분합니다.

ex) Feature/modal-publishing
```

### 2. 커밋 메세지 컨벤션

```
<태그>: <제목>

- 태그의 첫글자는 대문자로 작성합니다.
- 태그는 아래에 적힌 것들만 사용합니다.

Feat: 새로운 기능 추가, 기능 로직 변경
Fix: 버그 수정
Refactor: 코드 리팩토링 (기능 변화 X)
Style: 코드 포맷팅, 코드 변경이 없는 경우
Chore: 빌드 업무 수정, 패키지 매니저 수정
Docs: 문서 수정, 주석
```

### 3. 머지 전략

모든 Feature 브랜치는 Squash Merge 합니다.
