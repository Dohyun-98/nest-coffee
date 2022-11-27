import {
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IamportService {
  async getAccessToken() {
    try {
      const getToken = await axios({
        url: 'https://api.iamport.kr/users/getToken',
        method: 'post', // POST method
        headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
        data: {
          imp_key: process.env.IAMPORT_APIKEY, // REST API키
          imp_secret: process.env.IAMPORT_APISECRET,
        },
      });
      const { access_token } = getToken.data.response;
      return access_token;
    } catch (error) {
      throw new Error(error);
    }
  }

  async checkPaid({ impUid: imp_uid, access_token, amount }) {
    // imp_uid로 아임포트 서버에서 결제 정보 조회
    try {
      const getPaymentData = await axios({
        url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
        method: 'get', // GET method
        headers: { Authorization: access_token }, // 인증 토큰 Authorization header에 추가
      });
      const paymentData = getPaymentData.data.response; // 조회한 결제 정보
      if (paymentData.status !== 'paid') {
        throw new UnprocessableEntityException('status is not paid');
      }

      if (paymentData.amount !== amount) {
        throw new UnprocessableEntityException('amount is not correct');
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        throw new HttpException(
          error.response.data.message,
          error.response.status,
        );
      } else {
        throw error;
      }
    }
  }

  async cancel({ impUid, access_token, reason }) {
    try {
      // imp_uid로 아임포트 서버에서 결제 취소 요청
      const getCancelData = await axios({
        url: 'https://api.iamport.kr/payments/cancel',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: access_token, // 아임포트 서버로부터 발급받은 엑세스 토큰
        },
        data: {
          reason, // 가맹점 클라이언트로부터 받은 환불사유
          imp_uid: impUid, // imp_uid를 환불 `unique key`로 입력
        },
      });
      return getCancelData.data; // 환불 결과
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }

  async checkCancel({ impUid: imp_uid, access_token, amount }) {
    // imp_uid로 아임포트 서버에서 결제 정보 조회
    try {
      const getPaymentData = await axios({
        url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
        method: 'get', // GET method
        headers: { Authorization: access_token }, // 인증 토큰 Authorization header에 추가
      });
      const paymentData = getPaymentData.data.response; // 조회한 결제 정보
      console.log(paymentData.status);
      if (paymentData.status !== 'paid') {
        throw new UnprocessableEntityException('status is not paid');
      }

      if (paymentData.amount !== amount) {
        throw new UnprocessableEntityException('amount is not correct');
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        throw new HttpException(
          error.response.data.message,
          error.response.status,
        );
      } else {
        throw error;
      }
    }
  }
}
