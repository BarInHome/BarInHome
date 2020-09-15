import RefrigeratorBoard from '../components/mypage/DashBoardContents/MyRefrigerator/RefrigeratorBoard';
import MyInfo from '../components/mypage/DashBoardContents/UserInformation/MyInfo';
import { AccountBox, MoveToInbox, Instagram } from '@material-ui/icons';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

interface route {
  name: string;
  path: string;
  component?: () => JSX.Element;
  icon: (props: SvgIconProps) => JSX.Element;
}


const MypageRoutes: route[] = [
  {
    name: '내 냉장고',
    path: '/my-refg',
    component: RefrigeratorBoard,
    icon: MoveToInbox,
  },
  {
    name: '나의 정보',
    path: '/info',
    component: MyInfo,
    icon: AccountBox,
  },
  {
    name: '기타',
    path: '/others',
    icon: Instagram,
  },
]

export default MypageRoutes;