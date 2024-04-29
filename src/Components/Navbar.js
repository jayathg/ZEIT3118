export default function Navbar() {
    return (
        <nav className="nav">
            <a href="/AdminHomePage" className="site-title">
            TechSecure TaskForce
            </a>
            <ul>
                <li>
                    <a href="AddPage">AddData</a>
                </li>
                <li>
                <a href="EditPage">EditData</a>
                </li>
                <li>
                <a href="DeletePage">DeleteData</a>
                </li>
            </ul>
        </nav>
    )
}
