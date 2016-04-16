// first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
    service: "google"
});
ServiceConfiguration.configurations.insert({
    service: "google",
    clientId: "941904623190-19u6ii1dffrjj23sfv551ccmdkbuphfo.apps.googleusercontent.com",
    loginStyle: "popup",
    secret: "ZYiWY3p_SzIDhch0r5n8FfAj"
});