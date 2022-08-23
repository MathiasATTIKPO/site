import jwt from 'jsonwebtoken'
import mg from 'mailgun-js'

export const generateToken = (user) => {
    return jwt.sign({
        _id : user._id,
        name : user.name,
        email : user.email,
        isAdmin : user.isAdmin,
        isSeller: user.isSeller,
    }, 
    process.env.JWT_SECRET || 'somethingsecret',
    {
        expiresIn :'30d',

    }
    );
};

export const isAuth =(req , res , next) => {
    const authorization = req.headers.authorization;
    if(authorization){
        const token = authorization.slice(7, authorization.length);
        jwt.verify(
          token,
          process.env.JWT_SECRET || 'somethingsecret' , 
          (err , decode) => {
            if(err){
                res.status(401).send({
                    message: 'Invalide Token'
                });
            }else{
                req.user = decode;
                next();
            }
        });
    }else{
        res.status(401).send({message:'No token'});
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Admin Token' });
    }
  };

export const isSeller = (req, res, next) => {
    if (req.user && req.user.isSeller) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Seller Token' });
    }
  };
export const isSellerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.isSeller || req.user.isAdmin)) {
      next();
    } else {
      res.status(401).send({ message: 'Invalide Token Admin/Seller ' });
    }
  };

  export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });

  export const payOrderEmailTemplate = (order) => {
    return `<h1>Merci pour la confiance </h1>
    <p>
    Bonjour ${order.user.name},</p>
    <p>Vous avez terminé votre processus de location</p>
    <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
    <table>
    <thead>
    <tr>
    <td><strong>Logement</strong></td>
    <td><strong align="right">Prix</strong></td>
    </thead>
    <tbody>
    ${order.orderItems
      .map(
        (item) => `
      <tr>
      <td>${item.name}</td>
      <td align="right"> $${item.prix.toFixed(2)}</td>
      </tr>
    `
      )
      .join('\n')}
    </tbody>
    <tfoot>
    <tr>
    <td colspan="2">Items Price:</td>
    <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
    </tr>
    <tr>
    <td colspan="2">Prix de la taxe:</td>
    <td align="right"> $${order.taxPrice.toFixed(2)}</td>
    </tr>
    <tr>
    <td colspan="2">Prix ht :</td>
    <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
    </tr>
    <tr>
    <td colspan="2"><strong>Prix de la Location:</strong></td>
    <td align="right"><strong> $${order.totalPrice.toFixed(2)}</strong></td>
    </tr>
    <tr>
    <td colspan="2">Methode de payment :</td>
    <td align="right">${order.paymentMethod}</td>
    </tr>
    </table>
    <h2>Information locataire</h2>
    <p>
    ${order.shippingAddress.fullName},<br/>
    ${order.shippingAddress.address},<br/>
    ${order.shippingAddress.ville},<br/>
    ${order.shippingAddress.paix},<br/>
    ${order.shippingAddress.numero}<br/>
    </p>
    <hr/>
    <p>
    Merci pour la confiance.
    </p>
    `;
  };
  