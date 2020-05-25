const facebookConfig = {
  appid: '2574824219508509',
  secret: '0185d6f61dfb0bf340f9c477bbecb789',
  graphurl: 'https://graph.facebook.com/me?',
  params: '?fields=id,name,birthday,email,picture.type(large),gender,hometown,location&access_token=',
  fields: [
    'id',
    'name',
    'birthday',
    'email',
    'picture.type(large)',
    'gender',
    'hometown',
    'location'
  ]
}

export default facebookConfig
