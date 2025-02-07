import java.util.HashMap;

public class Main {
    public static int[] twoSum(int[] nums, int target) {
        // Create a HashMap to store the indices of the elements
        HashMap<Integer, Integer> map = new HashMap<>();

        // Iterate through the array
        for (int i = 0; i < nums.length; i++) {
            // Calculate the complement of the current element
            int complement = target - nums[i];

            // Check if the complement is already in the map
            if (map.containsKey(complement)) {
                // If it is, return the indices of the complement and the current element
                return new int[] { map.get(complement), i };
            }

            // Otherwise, add the current element and its index to the map
            map.put(nums[i], i);
        }

        // If no solution is found, return an empty array (though the problem guarantees one solution)
        return new int[] {};
    }

    public static void main(String[] args) {
        // Test cases
        int[] nums1 = {2, 7, 11, 15};
        int target1 = 9;
        int[] result1 = twoSum(nums1, target1);
        System.out.println("Output: [" + result1[0] + ", " + result1[1] + "]");

        int[] nums2 = {3, 2, 4};
        int target2 = 6;
        int[] result2 = twoSum(nums2, target2);
        System.out.println("Output: [" + result2[0] + ", " + result2[1] + "]");
    }
}
