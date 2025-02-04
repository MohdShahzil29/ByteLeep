import java.util.Arrays;

 class RotateArray {
    public static void reverseArray(int[] nums) {
        int start = 0, end = nums.length - 1;
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        reverseArray(arr);
        System.out.println(Arrays.toString(arr)); // Output: [5, 4, 3, 2, 1]
    }
}
