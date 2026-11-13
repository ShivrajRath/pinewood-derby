export const OZ_TO_GRAMS = 28.349523125
export const REAR_OVERHANG = 0.625
export const REAR_POCKET_LIMIT = 2.5
export const RULE_WEIGHT_LIMIT = 5.0

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const round = (value, precision = 2) => {
  const factor = 10 ** precision
  return Math.round(value * factor) / factor
}

/**
 * Solve for the mass to add at the rear and the position that puts the
 * centre of mass on target. Distances are inches ahead of the rear axle.
 */
export function calculateWeightPlan({
  currentWeight,
  currentCom,
  targetWeight,
  targetCom,
}) {
  const body = clamp(Number(currentWeight) || 0, 0.5, 6)
  const target = clamp(Number(targetWeight) || 0, 0.5, 6)
  const comNow = clamp(Number(currentCom) || 0, 0.5, 4)
  const comTarget = clamp(Number(targetCom) || 0, 0.5, 1.5)

  const weightToAdd = round(target - body, 3)
  const grams = Math.round(Math.abs(weightToAdd) * OZ_TO_GRAMS)
  const overLimit = target > RULE_WEIGHT_LIMIT + 0.0001
  const tolerance = 0.005

  const base = {
    weightToAdd,
    grams,
    overLimit,
    currentWeight: body,
    targetWeight: target,
    currentCom: comNow,
    targetCom: comTarget,
  }

  if (weightToAdd > tolerance) {
    const rawPosition = (target * comTarget - body * comNow) / weightToAdd
    const position = round(rawPosition, 2)
    const clampedPosition = round(
      clamp(rawPosition, -REAR_OVERHANG, REAR_POCKET_LIMIT),
      2,
    )

    let status = 'feasible'
    if (rawPosition < -REAR_OVERHANG - 0.001) status = 'rear-limit'
    else if (rawPosition > REAR_POCKET_LIMIT + 0.001) status = 'front-limit'

    return {
      ...base,
      status,
      position,
      clampedPosition,
      feasible: status === 'feasible',
    }
  }

  if (weightToAdd < -tolerance) {
    return {
      ...base,
      status: 'remove',
      position: null,
      clampedPosition: null,
      feasible: false,
    }
  }

  return {
    ...base,
    weightToAdd: 0,
    grams: 0,
    status: 'at-target',
    position: null,
    clampedPosition: null,
    feasible: false,
  }
}

export function formatPosition(position) {
  if (position === null || position === undefined) return null
  if (Math.abs(position) < 0.005) return 'at the rear axle line'
  return `${Math.abs(position).toFixed(2)} in ${
    position > 0 ? 'ahead of' : 'behind'
  } the rear axle`
}
