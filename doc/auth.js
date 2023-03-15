/**
* @openapi
* /api/auth/all:
*   get:
*     summary: Get all users
*     tags: [Auth]
*     produces:
*       - application/json
*/
/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: fname
 *         required: true
 *         type: string
 *       - name: lname
 *         required: true
 *         type: string
 *       - name: email
 *         required: true
 *         type: string
 *       - name: password
 *         required: true
 *         type: string
 *       - name: isAdmin
 *         required: false
 *         type: boolean
 */


/**
* @openapi
* /api/auth/activate:
*   post:
*     summary: Activate account via secret key
*     tags: [Auth]
*     produces:
*       - application/json
*     parameters:
*       - name: email
*         required: true
*         type: string
*       - name: secretKey
*         required: true
*         type: string
*
*/
/**
   * @openapi
* /api/auth/login:
*   post:
    *     tags: [Auth]
*     produces:
*       - application/json
*     parameters:
*       - name: username
*         required: true
*         type: string
*       - name: password
*         required: true
*         type: string
*
*/

/**
* @openapi
* /api/auth/logout:
*   post:
*     summary: Logout
*     tags: [Auth]
*     produces:
*       - application/json
*/
/**
* @openapi
* /api/auth/update:
*   put:
*     summary: Change your password
*     tags: [Auth]
*     produces:
*       - application/json
*     parameters:
*       - name: old_password
*         required: true
*         type: string
*       - name: new_password
*         required: true
*         type: string
*       - name: new_password_confirm
*         required: true
*         type: string
*
*/


/**
* @openapi
* /api/auth/forgot:
*   post:
*     summary: Forgot your password,sends your secretKey to your email
*     tags: [Auth]
*     produces:
*       - application/json
*     parameters:
*       - name: email
*         required: true
*         type: string
*
*/


/**
* @openapi
* /api/auth/reset:
*   post:
*     summary: Reset your password
*     tags: [Auth]
*     produces:
*       - application/json
*     parameters:
*       - name: email
*         required: true
*         type: string
*       - name: secretKey
*         required: true
*         type: string
*       - name: password
*         required: true
*         type: string
*       - name: confirm_password
*         required: true
*         type: string
*
*/




