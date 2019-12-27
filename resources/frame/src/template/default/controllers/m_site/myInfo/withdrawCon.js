
import WithdrawHeader from '../../../view/m_site/common/loginSignUpHeader/loginSignUpHeader';
import Panenl from '../../../view/m_site/common/panel';
import browserDb from '../../../../../helpers/webDbHelper';

export default {
  data:function () {
    return {
      payee:"",
      canWithdraw:'', //可提现余额
      withdrawalAmount:'',
      handlingFee:'',
      // actualCashWithdrawal:this.actual,
      phone:"", //绑定手机号
      bind:'verify',
      sms:'',
      show: false ,//数字键盘显示状态
      sendStatus:true, //发送验证码按钮
    }
  },

  components:{
    WithdrawHeader,
    Panenl
  },
  created(){
    this.withdrawUser()
  },
  computed:{
    actualCashWithdrawal(){
      return this.withdrawalAmount *this.handlingFee
    }
   
  },

  methods:{
    onInput(value) {
      this.withdrawalAmount = value;
      // this.actualCashWithdrawal = this.canWithdraw *this.handlingFee //实际提现金额
      console.log(value);
    },
    onDelete() {
      console.log('删除');
    },
    withdrawUser(){
      var userId = browserDb.getLItem('tokenId');
      this.appFetch({
        url:'users',
        method:'get',
        splice:'/'+userId
      }).then(res=>{
        console.log(res)
        this.payee= res.data.attributes.username;
        this.phone = res.data.attributes.mobile;
      })
     
      this.appFetch({
        url:'wallet',
        method:'get',
        splice:userId,
        data:{
          include:'',
        }
      }).then(res=>{
        this.canWithdraw = res.data.attributes.available_amount;
         this.handlingFee = res.data.attributes.cash_tax_ratio;
       
      })
    },
    withdraw(){
      this.appFetch({
        url:'cash',
        method:"post",
        data:{
          cash_apply_amount:this.withdrawalAmount
        }
      }).then((res)=>{
        // this.actualCashWithdrawal = res.data.attributes.cash_actual_amount; //实际提现金额
        this.canWithdraw = res.data.attributes.cash_apply_amount; //用户申请提现的金额
        this.handlingFee = res.data.attributes.cash_charge;//提现手续费
      })
       
      var withdrawalAmount = this.withdrawalAmount;
      var sms = this.sms;
      var canWithdraw = this.canWithdraw
      if(!withdrawalAmount){
        this.$toast('请输入提现金额')
        return
      }
      if(!sms){
        this.$toast('请输入验证码')
        return
      }
      if(canWithdraw == 0.00){
        this.$toast('可提现金额不足')
        return
      }
      this.appFetch({  //提交后验证验证码
        url:'smsVerify',
        method:'post',
        data:{
          "data": {
            "attributes": {
              "mobile": this.phone,
              "code": this.sms,
               "type":this.bind,

            }
          }
        }
      }).then(res=>{

      })
    },

    sendVerificationCode(){
      if(this.canWithdraw == 0.00 || this.phone ==''){
        this.sendStatus = false
      }
      var phone = this.phone
      if(!phone){
        this.$toast('请先绑定手机号')
        return
      }
      this.appFetch({
        url:'sendSms',
        method:'post',
        data:{
          "data": {
            "attributes": {
              // 'mobile':this.phone,
              'type':this.bind
            }
          }
        }
      }).then(res=>{
        console.log(res)
      })
    } //发送验证码
  }
}
