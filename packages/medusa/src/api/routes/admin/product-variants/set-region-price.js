import { MedusaError, Validator } from "medusa-core-utils"

export default async (req, res) => {
  const { id } = req.params

  const schema = Validator.object().keys({
    regionId: Validator.objectId().required(),
    amount: Validator.number().required(),
  })

  const { value, error } = schema.validate(req.body)
  if (error) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, error.details)
  }

  try {
    const productVariantService = req.scope.resolve("productVariantService")
    const productVariant = await productVariantService.setRegionPrice(
      id,
      value.regionId,
      value.amount
    )

    res.status(200).json(productVariant)
  } catch (err) {
    throw err
  }
}