# 아크 서바이벌 어센디드 디스코드 봇

## 프로젝트 개요

게임 아크 서바이벌 어센디드의 모든 서버 정보를 불러오고, Discord에서 유저정보와 서버정보를 조회할 수 있는 디스코드 봇입니다.

![디스코드 봇 정보 조회](/images/projects/arc-bot-info.png)

## 주요 기능

- **서버 정보 조회**: 서버 상태, 접속자 수, 맵 정보 실시간 조회

![서버 상태 조회](/images/projects/arc-bot-server.png)

- **유저 정보 조회**: 캐릭터 정보, 스탯, 인벤토리 확인
- **자동 알림**: 서버 점검, 이벤트 시작 알림
- **관리 기능**: 서버 원격 제어 명령어 지원

![유저 정보](/images/projects/arc-bot-user.png)

## 기술 스택

| 구분 | 기술 |
|------|------|
| Language | Python |
| Library | discord.py |
| Game API | 게임 서버 API 연동 |
| Hosting | VPS |

## 회고

게임 서버 API를 연동하여 Discord 봇으로 간접 제어하는 방법을 익혔습니다.
