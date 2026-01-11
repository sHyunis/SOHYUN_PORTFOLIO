import { forwardRef } from "react";
import * as THREE from "three";
import { COLORS } from "@/constants/colors";

interface AvatarModelProps {
  leftArmRef: React.RefObject<THREE.Mesh | null>;
  rightArmRef: React.RefObject<THREE.Mesh | null>;
  leftLegRef: React.RefObject<THREE.Mesh | null>;
  rightLegRef: React.RefObject<THREE.Mesh | null>;
}

export const AvatarModel = forwardRef<THREE.Group | null, AvatarModelProps>(
  ({ leftArmRef, rightArmRef, leftLegRef, rightLegRef }, ref) => {
    return (
      <group ref={ref} position={[0, 0, 0]} scale={0.5}>
        <mesh position={[0, 1.4, 0]}>
          <boxGeometry args={[0.4, 0.3, 0.35]} />
          <meshStandardMaterial color={COLORS.avatar.head} roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 1.4, 0.15]}>
          <boxGeometry args={[0.3, 0.08, 0.1]} />
          <meshStandardMaterial color={COLORS.avatar.accent} emissive={COLORS.avatar.accent} emissiveIntensity={2} />
        </mesh>

        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[0.5, 0.8, 0.3]} />
          <meshStandardMaterial color={COLORS.avatar.body} roughness={0.5} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.9, 0.16]}>
          <circleGeometry args={[0.08, 32]} />
          <meshStandardMaterial color={COLORS.avatar.accent} emissive={COLORS.avatar.accent} emissiveIntensity={1} />
        </mesh>

        <group position={[-0.35, 1.1, 0]}>
          <mesh ref={leftArmRef} position={[0, -0.3, 0]}>
            <boxGeometry args={[0.15, 0.7, 0.15]} />
            <meshStandardMaterial color={COLORS.avatar.head} roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
        <group position={[0.35, 1.1, 0]}>
          <mesh ref={rightArmRef} position={[0, -0.3, 0]}>
            <boxGeometry args={[0.15, 0.7, 0.15]} />
            <meshStandardMaterial color={COLORS.avatar.head} roughness={0.2} metalness={0.8} />
          </mesh>
        </group>

        <group position={[-0.15, 0.4, 0]}>
          <mesh ref={leftLegRef} position={[0, -0.35, 0]}>
            <boxGeometry args={[0.18, 0.8, 0.18]} />
            <meshStandardMaterial color={COLORS.avatar.limbs} roughness={0.5} metalness={0.5} />
          </mesh>
        </group>
        <group position={[0.15, 0.4, 0]}>
          <mesh ref={rightLegRef} position={[0, -0.35, 0]}>
            <boxGeometry args={[0.18, 0.8, 0.18]} />
            <meshStandardMaterial color={COLORS.avatar.limbs} roughness={0.5} metalness={0.5} />
          </mesh>
        </group>
      </group>
    );
  }
);

AvatarModel.displayName = "AvatarModel";
