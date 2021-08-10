const ipAddressUI = document.querySelector('.ip_address');
const locationinfo = document.querySelector('.location_value');
const timeZone = document.querySelector('.time_zone_value');
const isp = document.querySelector('.isp_value');
const ipInput = document.querySelector('.ip_input');
const goButton = document.querySelector('.search_button');
const map = document.querySelector('#map');
const vw = Math.max(document.documentElement.clientHeight)

const API_KEY = 'at_oKAF2eyqv98B5ICXsGrm715MP7wVL';
const url = 'https://geos.ipify.org/api/v1';
const urlForOwnip = 'https://api.db-ip.com/v2/free/self';
const accurateIP = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
// const ipAddress = '197.156.86.115';

map.style.height = `${vw-225}px`

console.log(url + '?' + 'apiKey=' + API_KEY + '&ipAddress=' + '197.156.86.115')
fetch(urlForOwnip)
.then(res => res.json())
.then(res => {
    fetchIPAndUpdateUI(res.ipAddress)
})
.catch(err => {
    const Err = new Error(err);
    console.log(Err);
})

goButton.addEventListener('click', ()=>{
    fetchIPAndUpdateUI(ipInput.value)
})

const fetchIPAndUpdateUI = (ipAddress) =>{
    console.log(ipAddress);
    if(accurateIP.test(ipAddress))
    {
        ipInput.value = '';
        ipInput.placeholder = 'Loading...';
        infoSectionLoading()
        fetch(url + '?' + 'apiKey=' + API_KEY + '&ipAddress=' + ipAddress)
        .then(res => res.json())
        .then(res => {
        updateInfoSection(res);
        })
        .catch(() => ipInput.placeholder = 'Failed to fetch...')
    } else{
        ipInput.value = '';
        ipInput.placeholder = 'Invalid ip address';
    }
    
}

const updateInfoSection = (res) => {
    locationinfo.innerHTML = res.location.city + ', ' + res.location.country;
    ipAddressUI.innerHTML = res.ip;
    timeZone.innerHTML ='GMT ' + res.location.timezone;
    isp.innerHTML = res.isp
    ipInput.placeholder = 'IP Address'
}
const infoSectionLoading = () => {
    locationinfo.innerHTML = '-';
    ipAddressUI.innerHTML = '-';
    timeZone.innerHTML ='-';
    isp.innerHTML = '-'
}

visualViewport.addEventListener('resize', function() {
    const vw = Math.max(document.documentElement.clientHeight)
    map.style.height = `${vw-225}px`
    console.log(vw)
});
