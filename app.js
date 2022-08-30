

// Calling && Fetching API....
const loadPhones = async (search, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}

// Displaying Phones to User....
const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');

    // Displaying 20 itmes in a Page.
    const goNext = document.getElementById('go-next');
    if (dataLimit && phones.length > 12) {
        phones = phones.slice(0, 12);
        goNext.classList.remove('d-none')
    } else {
        goNext.classList.add('d-none');
    }

    phoneContainer.textContent = '';

    // Nothing Fond Warning....
    const nothingFond = document.getElementById("warning-msg");
    if (phones.length <= 0) {
        nothingFond.classList.remove('d-none');
    } else {
        nothingFond.classList.add("d-none");
    }

    // Adding new element into the phone div.
    phones.forEach(phone => {
        const [brand, name, slug, image] = [phone.brand, phone.phone_name, phone.slug, phone.image];
        const phoneDiv = document.createElement('div');
        phoneDiv.innerHTML = `
        <div class="col">
            <div class="card text-center">
                <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Brand Name: ${brand}</h5>
                    <p class="card-text">Phone Model : ${name}</p>

                    <!-- Button trigger modal -->
                    <button onclick = "phoneDetails('${slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details...</button>
                </div>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    // After all this all data has been loaded so Loading stops here.
    toogleSpinner(false);
}

// Processing Search 
const processingSearch = (dataLimit) => {
    // Searching Starts From here so loading starts from here.
    toogleSpinner(true);
    const searchIntem = document.getElementById("input-field");
    const result = searchIntem.value;
    loadPhones(result, dataLimit);
}

// Adding Click Handeler to Search Button .
document.getElementById('search-btn').addEventListener('click', function () {
    processingSearch(12);
});

// Adding Enter Button as Event Handler 
document.getElementById('input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processingSearch(12)
    }
})

const toogleSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading");
    if (isLoading) {
        loadingSpinner.classList.remove('d-none');
    }
    else {
        loadingSpinner.classList.add('d-none');
    }
}

// Adding Click Handeler to the next button .
document.getElementById('go-next').addEventListener('click', function () {
    processingSearch();
})

const phoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json();
    displayPhoneDetails(data.data);
}

// Adding Phone Details ...
const displayPhoneDetails = phone => {
    const title = document.getElementById('exampleModalLabel');
    title.innerText = phone.name;
    const phoneDisplay = document.getElementById('phone-display');
    phoneDisplay.innerText = phone.mainFeatures.displaySize;
    const Cheapset = document.getElementById('phone-chipset');
    Cheapset.innerText = phone.mainFeatures.chipSet;
    const Storage = document.getElementById('phone-storage');
    Storage.innerText = phone.mainFeatures.storage;
    const releaseDate = document.getElementById('phone-releasedate');
    releaseDate.innerText = phone.releaseDate;
}

loadPhones('samsung', 12);