# CDN 사진 업로드 사이트

## 프로젝트 개요

사진을 업로드하면 이미지를 호스팅하는 링크를 생성하여 공유할 수 있는 사이트입니다.

![CDN 업로드 사이트 메인](/images/projects/cdn-upload-main.png)

## 주요 기능

- **사진 업로드**: Drag & Drop 또는 클릭으로 사진 업로드
- **즉시 공유 링크**: 업로드 완료 후 복사 가능한 이미지 링크 제공

![업로드 완료 화면](/images/projects/cdn-upload-result.png)

- **다중 업로드**: 여러 파일 동시에 업로드 가능
- **유효기간 설정**: 링크 만료 기간 설정
- ** galería**: 최근 업로드 이미지 히스토리

## 기술 스택

| 구분 | 기술 |
|------|------|
| Backend | Node.js, Express |
| Frontend | HTML, CSS |
| Storage | 로컬 파일 시스템 |
| Deployment | VPS |

## 회고

파일 업로드/저장/삭제 파이프라인을 구축하며 Node.js의 파일 처리 기능을 익혔습니다.
