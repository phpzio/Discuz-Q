/**
 * 个人主页
 */


import HomePageHeader from '../../../view/m_site/common/loginSignUpHeader/loginSignUpHeader'
import ContHeader from '../../../view/m_site/common/cont/contHeaderView'
import ContMain from '../../../view/m_site/common/cont/contMainView'
import ContFooter from '../../../view/m_site/common/cont/contFooterView'

export default {
  data:function () {
    return {
      imgUrl:'',
      stateTitle:'点赞了我',
      time:"15分钟前",
      userName:'Elizabeth',
      contText:'我们来看一下程序员经常去的 14 个顶级开发者社区，如果你还不知道它们，那么赶紧去看看，也许会有意想不到的收获。'
    }
  },

  components:{
    HomePageHeader,
    ContHeader,
    ContMain,
    ContFooter
  },
  created(){
    this.imgUrl = "../../../../../../../static/images/mytx.png"
  }
}
