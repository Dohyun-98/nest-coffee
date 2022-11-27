# nest-coffee


## 1. Description
Nestjs와 Graphql을 이용한 커피판매 웹 서비스 [API 구현]
1. 관리자 권한 분기
2. 상품 등록 구현
3. 상품 조회 구현
4. 상품 수정 구현
5. 이미지 업로드 구현
6. 결제 기능 구현
7. 주문 기능 구현
8. 쿠폰 발급 구현
9. Oauth2.0 소셜 로그인 구현
10. 검색엔진 구현

## 2. Environment
docker 환경구성
1. node 14
2. mysql 8
3. redis 7.0.5
4. elasticsearch 7.17.0
5. logstash 7.17.0

## 3. Prerequisite
프로젝트 실행 전  `yarn install`  명령어 실행
#### env 환경변수
```
DATABASE_TYPE
DATABASE_HOST
DATABASE_PORT
DATABASE_DATABASE
DATABASE_USERNAME
DATABASE_PASSWORD

ACCESS_SECRET
REFRESH_SECRET

GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

NAVER_CLIENT_ID
NAVER_CLIENT_SECRET
NAVER_CALLBACK_URL

KAKAO_CLIENT_ID
KAKAO_CLIENT_SECRET
KAKAO_CALLBACK_URL

FACEBOOK_CLIENT_ID
FACEBOOK_CLIENT_SECRET

IAMPORT_APIKEY
IAMPORT_APISECRET

GOOGLE_CLOUD_PROJECT_ID
GOOGLE_CLOUD_KEYFILE
GOOGLE_CLOUD_BUCKET_NAME
GOOGLE_CLOUD_PATH

REDIS_URL
```


## 4. ERD
<img width="943" alt="스크린샷 2022-11-27 오후 10 08 34" src="https://user-images.githubusercontent.com/68360133/204136994-db4eb6d0-55d9-4d47-9477-18e1bc23ddda.png">

## 5. API 테스트 예시 화면
<img width="1437" alt="스크린샷 2022-11-27 오후 10 17 21" src="https://user-images.githubusercontent.com/68360133/204137324-bb0c4536-1014-4405-a99f-7fe591366c20.png">

