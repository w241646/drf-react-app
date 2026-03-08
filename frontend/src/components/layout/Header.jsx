import { Link, useLocation } from 'react-router-dom';
import { useHamBtnMenu } from "../../hooks/ui/useHamBtnMenu";
import saitama_logo from '../../assets/images/saitama_icon.png';

const navItems = [
    { path: "/origin", label: "自転車文化の源流" },
    { path: "/cycling-road", label: "サイクリングロード" },
    { path: "/saitama-criterium", label: "サイクルイベント" },
    { path: "/trivia", label: "自転車豆知識" },
    { path: "/game", label: "自転車ゲーム" },
];

export default function Header() {
    useHamBtnMenu();

    const location = useLocation();
    const currentPage = location.pathname;

    return (
        <header className='fixed'>
            <div className='hwrap flexBox'>
                <h1 className='logo flexBox'>
                    <img src={saitama_logo} className='sIcon' alt='logo' />
                    <Link to="/" translate='no'>
                        <span>Saitama Cycle Journey</span>
                        <p>彩りの輪</p>
                    </Link>
                </h1>

                <nav className='navi sp_none'>
                    <ul className='flexBox'>
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`f__link ${ currentPage === item.path ? 'current' : ''}`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* ハンバーガーメニュー */}
            <div id='hamMenu' className='ham pc_none'>
                <button type='button' className='btn_menu'>
                    <div className='back_color'>
                        <span className='bar bar1'></span>
                        <span className='bar bar2'></span>
                        <span className='bar bar3'></span>
                    </div>
                </button>
                <nav className='scrollbar_none'>
                    <ul className='ham_list'>
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`f__link ${ currentPage === item.path ? 'current' : ''}`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}