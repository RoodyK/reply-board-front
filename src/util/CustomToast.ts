import { singleton } from 'tsyringe';
import { useToast } from 'vue-toastification';

@singleton()
export default class Toast {
  private toast;

  constructor(){
    this.toast = useToast();
  }

  public showToast(message: string) {
    this.toast.clear(); // 이전의 토스트 메시지를 제거
    this.toast(message, {
      timeout: 2000, // 2초 동안 유지
      hideProgressBar: true, // 진행 바 숨기기
      closeOnClick: false, // 클릭하면 닫기
      pauseOnHover: false, // 마우스를 올리면 멈춤
      toastClassName: 'custom-toast',
      draggable: true,
      draggablePercent: 0.6,
    });
  }
}

