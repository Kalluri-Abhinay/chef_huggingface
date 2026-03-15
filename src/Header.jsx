import cheflogo from './assets/chef.png'
import './index.css'

export default function Header() {

    return (
        <header>
            <img src={cheflogo} className="chef" alt="Chef logo"  />
            <h1>Chef</h1>
        </header>
    )
}