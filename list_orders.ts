require('dotenv').config()

const axios = require('axios')

const { onchain } = require('stag-wallet')

async function run() {

  const url = 'https://staging-backend.relayx.com/api/market/GOP/orders'

  const { data: { data: { token, orders } } } = await axios.get(url)

  console.log(token)

  for (let order of orders) {

    console.log({ order })

    const result = await onchain.findOne({
      app: 'run.relayx.io',
      type: 'order',
      content: {
        token_origin: token.origin,
        txid: order.txid
      },
      author: '1AWKGankHNadk3PR25UZ1tcBqRbDJrn11j'
    })

    if (!result) {

      const postResult = await onchain.post({
        app: 'run.relayx.io',
        key: 'order',
        val: Object.assign(order, {
          token_origin: token.origin,
        }),
      })

      console.log({ postResult })

    }

    console.log({ result })

  }

}

run()

