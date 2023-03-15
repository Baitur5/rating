
/**
 * @openapi
 * /api/auth/universities:
 *   post:
 *     tags: [University]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         required: true
 *         type: string
 *       - name: departments
 *         required: true
 *         type: array
 *         in: Department
 *         items:
 *           type:string
 */
