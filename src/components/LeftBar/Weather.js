export const Weather = () => {

    fetch('http://api.openweathermap.org/data/2.5/weather?q=Kryvyi+Rih&APPID=e18593023985009f7137418ec12c53ad')
        .then(function (resp) { return resp.json() }) //convert data to json
        .then(function (data) {
            // console.log(data);
            document.querySelector('.package-name').textContent = data.name;
            document.querySelector('.price').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
            document.querySelector('.disclaimer').textContent = data.weather[0]['description'];
            document.querySelector('.features li').innerHTML = 'Hum' + data.main.humidity + '%';
        })
        .catch(function () {
            //catch any errors
        });

    return (
        <div className="weather">
            <div className="pricing-table row">
                <div className="package featured">
                    <p className="package-name">Жопа</p>

                    <p className="price">10&deg;</p>
                    <p className="disclaimer">Clouds</p>

                    <ul className="features text-center">
                        <li>Feature 1</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
