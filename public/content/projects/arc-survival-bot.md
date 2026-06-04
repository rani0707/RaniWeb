# 아크 서바이벌 어센디드 디스코드 봇

## 프로젝트 소개
아크 서바이벌 어센디드(ASA) 서버 정보를 Discord 안에서 빠르게 확인하고 관리할 수 있도록 만든 디스코드 봇입니다. Epic Online Services API, 서버 쿼리, 웹소켓 데이터를 함께 활용해 **실시간 서버 상태 조회**, **접속 유저 식별**, **입장/퇴장 알림**, **유저 접속 이력 조회**를 한 번에 처리하도록 구성했습니다.

특히 단순히 서버 인원만 보여주는 수준이 아니라, 서버에 접속한 유저를 플랫폼 정보와 함께 추적하고 DB에 누적 저장하여, 운영자가 Discord에서 바로 서버 상황을 파악할 수 있도록 만든 것이 핵심입니다.

## 주요 기능
- **실시간 서버 조회**: `/scan` 명령어로 서버명, 현재 인원, 최대 인원, 맵 정보, 세션 정보를 즉시 조회
- **유저 정보 조회**: `/userinfo` 명령어로 유저 토큰 또는 Steam ID 기준 접속 이력, 마지막 접속 시간, 자주 접속한 서버 확인
- **서버 등록 및 자동 갱신**: `/register` 명령어로 서버를 등록하면 지정 채널의 메시지를 주기적으로 갱신
- **입장/퇴장 알림**: 서버 인원 변화와 웹소켓 기반 유저 변화를 비교해 누가 들어오고 나갔는지 Discord 임베드로 알림
- **유저 데이터 누적 관리**: 접속한 유저의 Steam 계정과 서버별 방문 횟수를 MySQL에 저장해 운영 데이터로 활용

## 기술 스택
- **Language**: Python
- **Core Library**: `discord.py`, `aiohttp`, `websockets`
- **Game / External API**: Epic Online Services API, `opengsq`
- **Database / ORM**: MySQL, Tortoise ORM
- **Infra / Runtime**: Discord Slash Command Bot, Async Background Task

## 느낀 점
실시간 게임 서버 데이터를 Discord 봇으로 연결하면서, 단순 명령형 봇보다 한 단계 더 나아간 **운영 도구 형태의 봇 구조**를 직접 구현해볼 수 있었습니다. 특히 비동기 처리, 외부 API 연동, 웹소켓 데이터 수집, DB 누적 저장을 함께 다루면서 서비스성 봇을 설계하는 경험을 쌓을 수 있었고, 실제 운영 관점에서 어떤 정보가 유용한지도 많이 배울 수 있었습니다.

![사용 사진1](/images/projects/6030b99f-8ce3-4b53-b3aa-ab10bc9c2b9a.png)

![사용 사진2](/images/projects/8f651707-b0a9-4564-b946-42eaafa6621f.png)
